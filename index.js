require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const port = process.env.PORT || 5000;
const app = express();

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://task-management-fdbe6.web.app",
    "https://task-management-server-nu-six.vercel.app",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  // ... [Your existing verifyToken code]
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hvkkh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("TaskManagement");
    const userCollection = db.collection("users");
    const taskCollection = db.collection("tasks");

    // Save a user
    app.post("/users/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const user = req.body;

        const query = { email: email };
        const isExist = await userCollection.findOne(query);

        if (isExist) {
          // If the user already exists, return the existing user
          return res.send(isExist);
        }

        // If the user doesn't exist, insert them into the database
        const result = await userCollection.insertOne({
          ...user,
          timestamp: Date.now(),
        });

        res.send(result);
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send({ message: "Failed to save user" });
      }
    });

    // Create a task
    app.post("/tasks", async (req, res) => {
      try {
        const task = req.body;
        task.timestamp = new Date();
        task.order =
          (await taskCollection.countDocuments({ category: task.category })) +
          1; // Set initial order

        const result = await taskCollection.insertOne(task);
        res.status(201).json(result);
      } catch (error) {
        console.error("Error creating task:", error);
        res.status(400).json({ message: error.message });
      }
    });

    // Get all tasks for a user
    app.get("/tasks/:email", async (req, res) => {
      try {
        console.log("Received a GET request for /tasks/:email");

        const userEmail = req.params.email;
        console.log("User email:", userEmail);

        const tasks = await taskCollection
          .find({ "userData.email": userEmail })
          .sort({ order: 1 }) // Sort tasks by order
          .toArray();

        console.log("Tasks retrieved:", tasks);

        res.send(tasks);
      } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).send({ message: error.message });
      }
    });

    // Reorder tasks within the same section
    app.put("/tasks/reorder-tasks", async (req, res) => {
      try {
        const { tasks } = req.body; // Array of tasks with updated order and category

        if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
          return res.status(400).json({ message: "Invalid tasks array" });
        }

        const bulkOps = tasks.map((task) => {
          if (!task._id || !ObjectId.isValid(task._id)) {
            throw new Error(`Invalid _id: ${task._id}`);
          }
          return {
            updateOne: {
              filter: { _id: new ObjectId(task._id) },
              update: { $set: { order: task.order, category: task.category } },
            },
          };
        });

        const result = await taskCollection.bulkWrite(bulkOps);

        res.json({ message: "Tasks reordered successfully" });
      } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ message: "Failed to reorder tasks" });
      }
    });

    // Update a task (category or order)
    app.put("/tasks/:id", async (req, res) => {
      console.log("\nReceived PUT request to /tasks/:id");
      try {
        const { id } = req.params;
        console.log("ID from params:", id);
        console.log("Request body:", req.body);

        let updatedTask = req.body;

        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
          console.error("Invalid Object ID:", id);
          return res.status(400).json({ message: "Invalid task ID" });
        }

        // Remove `_id` from the updatedTask if it exists
        if (updatedTask._id) {
          delete updatedTask._id;
        }

        // Use the correct option based on your MongoDB driver version
        const result = await taskCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updatedTask },
          {
            // Uncomment the appropriate option based on your MongoDB driver version
            returnOriginal: false, // For MongoDB Driver 3.x or earlier
            // returnDocument: 'after',   // For MongoDB Driver 4.x or later
          }
        );

        console.log("findOneAndUpdate result:", result);

        // Since `result` is the updated document, check if it's null
        if (!result) {
          console.error("Task not found with ID:", id);
          return res.status(404).json({ message: "Task not found" });
        }

        console.log("Task updated successfully:", result);
        res.status(200).json(result);
      } catch (error) {
        console.error("Backend Error:", error);
        res
          .status(500)
          .json({ message: "Failed to update task", error: error.message });
      }
    });

    // Delete a task
    app.delete("/tasks/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid task ID" });
        }

        const result = await taskCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
      } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Failed to delete task" });
      }
    });
  } finally {
    // Optional cleanup here
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Task Manager Server.");
});

app.listen(port, () => {
  console.log(`Task Manager is running on port ${port}`);
});
