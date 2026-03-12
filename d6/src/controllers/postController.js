export const getAllPosts = (req, res) => {
    res.json({ message: 'Get all posts' });
}

export const getPostById = (req, res) => {
    res.json({ message: 'Get post', id: req.params.id });
}

export const createPost = (req, res) => {
    res.status(201).json({ message: 'Create post' });
}

export const updatePost = (req, res) => {
    res.json({ message: 'Update post', id: req.params.id });
}

export const deletePost = (req, res) => {
    res.status(204).send();
}