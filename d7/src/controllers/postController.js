import PostModel from "../models/postModel.js";
import asyncHandler from 'express-async-handler'

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await PostModel.find({}).populate({
        path: 'author',
        select: 'firstName lastName',
        populate: {
            path: 'profile',
            select: 'nickname'
        }
    })
    return res.json(posts)
})

export const getPostById = (req, res) => {
    res.json({ message: 'Get post', id: req.params.id });
}

export const createPost = asyncHandler(async (req, res) => {
    const {
        text, title, author
    } = req.body
    const post = new PostModel({
        text,
        title,
        author
    })
    await post.save()
    res.status(201).json({
        success: true,
        data: post,
        message: 'Post created successfully'
    });
})

export const updatePost = (req, res) => {
    res.json({ message: 'Update post', id: req.params.id });
}

export const deletePost = (req, res) => {
    res.status(204).send();
}