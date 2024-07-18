import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  const { id } = req.query;
  const productsFilePath = path.join(process.cwd(), 'data', 'products.json');
  const productsFile = fs.readFileSync(productsFilePath, 'utf8');
  let products = JSON.parse(productsFile);

  products = products.filter(product => product.id !== id);

  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

  res.status(200).json({ message: 'Product deleted' });
};

