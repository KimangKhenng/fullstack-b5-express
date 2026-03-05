import express from 'express';
const app = express();

app.use(express.json());

// Sample data
const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999, stock: 15 },
    { id: 2, name: 'Phone', category: 'electronics', price: 699, stock: 25 },
    { id: 3, name: 'Desk', category: 'furniture', price: 299, stock: 10 },
    { id: 4, name: 'Chair', category: 'furniture', price: 150, stock: 30 },
    { id: 5, name: 'Monitor', category: 'electronics', price: 350, stock: 20 }
];

// GET /api/products with filtering and sorting
app.get('/api/products', (req, res) => {
    let result = [...products];

    // Filter by category
    if (req.query.category) {
        result = result.filter(p => p.category === req.query.category);
    }

    // Filter by price range
    if (req.query.minPrice) {
        result = result.filter(p => p.price >= parseFloat(req.query.minPrice));
    }
    if (req.query.maxPrice) {
        result = result.filter(p => p.price <= parseFloat(req.query.maxPrice));
    }

    // Filter by stock availability
    if (req.query.inStock === 'true') {
        result = result.filter(p => p.stock > 0);
    }

    // Sort (e.g., sort=price or sort=-price for descending)
    if (req.query.sort) {
        const sortField = req.query.sort.replace('-', '');
        const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;

        result.sort((a, b) => {
            if (a[sortField] < b[sortField]) return -1 * sortOrder;
            if (a[sortField] > b[sortField]) return 1 * sortOrder;
            return 0;
        });
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedResults = result.slice(startIndex, endIndex);

    res.json({
        success: true,
        count: paginatedResults.length,
        total: result.length,
        page,
        totalPages: Math.ceil(result.length / limit),
        data: paginatedResults
    });
});

// GET /api/products/:id (single product)
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }

    res.json({
        success: true,
        data: product
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});