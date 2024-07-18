import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  const productsFilePath = path.join(process.cwd(), 'data', 'products.json');
  const productsFile = fs.readFileSync(productsFilePath, 'utf8');
  const products = JSON.parse(productsFile);

  res.status(200).json(products);
};
