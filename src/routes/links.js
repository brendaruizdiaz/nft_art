const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { titulo, url, descripcion } = req.body;
    const newLink = {
        titulo,
        url,
        descripcion
    };
    await pool.query('INSERT INTO links set ?', [newLink]); 
    req.flash('success', 'Link guardado correctamente');
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    res.render('links/list', { links });
});

router.get('/borrado/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link borrado correctamente');
    res.redirect('back');
});

router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, url } = req.body;
    const newLink = {
        titulo,
        descripcion,
        url
    };
    console.log(newLink);
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link editado correctamente');
    res.redirect('/links');
});

module.exports = router;