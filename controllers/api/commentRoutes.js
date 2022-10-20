const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        if (!commentData) {
            res.status(404).json({ message: 'There are no comments around these parts.'});
            return;
        }
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: `There is no comment with id = ${req.params.id}` });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body, user_id: req.session.user_id
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(
         {
            comment_text: req.body.comment_text
         },
         {
            where: {
            id: req.params.id
            }
         }
        );
        if(!updatedComment) {
            res.status(404).json({ message: `No comment found with id = ${req.params.id}`});
            return;
        }
        res.status(200).json(updatedComment);
    } catch(err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            },
        });
        if(!commentData) {
            res.status(404).json({ message: `No posted owned by user_id = ${req.session.user_id} found with id = ${req.params.id}` });
            return;
        }
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;