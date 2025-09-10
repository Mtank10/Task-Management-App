import Task from "../model/task-model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    console.log(title);
    const userId = req.user._id;

    const task = new Task({
      title,
      description,
      status,
      owner: userId
    });

    await task.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    console.error('Create Task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during task creation'
    });
  }
}


export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, search, page = 1, limit = 10 } = req.query;

    const query = { owner: userId };
    
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalTasks = await Task.countDocuments(query);
    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
      pagination: {
        totalTasks,
        totalPages,
        currentPage: parseInt(page)
      }
    });
  } catch (error) {
    console.error('Get All Tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during fetching tasks'
    });
  }
}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, owner: userId });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    console.error('Update Task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during task update'
    });
  } 
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOneAndDelete({ _id: id, owner: userId });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete Task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during task deletion'
    });
  }
}

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task retrieved successfully',
      data: task
    });
  } catch (error) {
    console.error('Get Task By ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during fetching task'
    });
  }
}