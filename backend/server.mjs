import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Bloqueia a requisição de favicon
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database (JSON files)
const usersFile =  './backend/data/users.json' ;
const menuFile = './backend/data/menu.json';
// const ordersFile = '../data/orders.json';

let orders = [];

app.post('/orders', (req, res) => {
    const { customerName, items } = req.body;

    if (!customerName || !items || items.length === 0) {
        return res.status(400).json({ error: 'Dados inválidos' });
    }

    const newOrder = { id: orders.length + 1, customerName, items, status: 'Pendente' };
    orders.push(newOrder);

    res.status(201).json({ message: 'Pedido criado com sucesso', order: newOrder });
});


// Utility functions
function readFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 1. Registro de usuário
app.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    const users = readFile(usersFile);

    console.log(users);
    console.log(req.body);

    if (users.find((user) => user.username === username)) {
        return res.status(400).json({ message: 'Usuário já existe.' });
    }

    users.push({ username, password, role });
    writeFile(usersFile, users);
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
});

// 2. Login de usuário
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readFile(usersFile);

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    res.json({ username: user.username, role: user.role });
});

// 3. Gerenciamento do menu (Gestor)
app.post('/menu', (req, res) => {
    const { role } = req.body; // Role do gestor
    if (role !== 'gestor') {
        return res.status(403).json({ message: 'Acesso negado.' });
    }

    const menu = readFile(menuFile);
    const { entradas, pratoPrincipal, sobremesas } = req.body;
    writeFile(menuFile, { entradas, pratoPrincipal, sobremesas });
    res.json({ message: 'Menu atualizado com sucesso.' });
});

// 4. Obter menu (Consumidor)
app.get('/menu', (req, res) => {
    const menu = readFile(menuFile);
    res.json(menu);
});

// 5. Fazer pedidos (Consumidor)
app.post('/order', (req, res) => {
    const { username, items } = req.body;
    const orders = readFile(ordersFile);

    orders.push({ username, items, status: 'pendente' });
    writeFile(ordersFile, orders);
    res.json({ message: 'Pedido criado com sucesso.' });
});

// 6. Obter pedidos (Cozinha)
app.get('/orders', (req, res) => {
    const orders = readFile(ordersFile);
    res.json(orders);
});

// 7. Atualizar estado do pedido (Cozinha)
app.put('/order/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const orders = readFile(ordersFile);

    const order = orders.find((o, index) => index == id);
    if (!order) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    order.status = status;
    writeFile(ordersFile, orders);
    res.json({ message: 'Estado do pedido atualizado.' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
