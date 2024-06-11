import { Router } from 'express';
import NodeCache from 'node-cache';
import { fetchTasks, getAddTask, postAddTask, getUpdateTask, patchUpdateTask, deleteTask } from '../controllers/taskController.js';
import verify from '../middleware.js';

const router = Router();
const cache = new NodeCache(); // Initialize node-cache


// router.get('/', (req, res, next) => {
//     // Check if data exists in cache
//     const cachedData = cache.get('tasks');
//     if (cachedData) {
//         return res.json(cachedData); // Return cached data
//     }

//     // If data not in cache, fetch from database
//     fetchTasks(req, res, next).then((tasks) => {
//         // Store data in cache with a TTL (time-to-live) of 10 seconds
//         cache.set('tasks', tasks, 10);
//         res.json(tasks);
//     }).catch(next);
// });

// Read all tasks
router.get('/', verify,(req, res, next) => {
    // Check if data exists in cache
    const cachedData = cache.get('tasks');
    if (cachedData) {
        return res.json(cachedData); // Return cached data
    }

    // If data not in cache, fetch from database
    fetchTasks(req, res, next).then((tasks) => {
        // Store data in cache with a TTL (time-to-live) of 10 seconds
        cache.set('tasks', tasks, 10);
        res.json(tasks);
    }).catch(next);
});

// Adding task
router.post('/addTask', verify, (req, res, next) => {
    // Clear cache when a new task is added
    cache.del('tasks');
    postAddTask(req, res, next);
});

// Update task
router.patch('/updateTask/:id', verify, (req, res, next) => {
    // Clear cache when a task is updated
    cache.del('tasks');
    patchUpdateTask(req, res, next);
});

// Delete task
router.delete('/:id', verify, (req, res, next) => {
    // Clear cache when a task is deleted
    cache.del('tasks');
    deleteTask(req, res, next);
});

export default router;
