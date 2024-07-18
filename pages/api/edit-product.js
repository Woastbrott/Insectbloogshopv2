import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing the form' });
    }

    const { id } = req.query;
    const productsFilePath = path.join(process.cwd(), 'data', 'products.json');
    const productsFile = fs.readFileSync(productsFilePath, 'utf8');
    let products = JSON.parse(productsFile);

    products = products.map(product => 
      product.id === id ? { ...product, ...fields, image: files.image ? `/uploads/${files.image.name}` : product.image } : product
    );

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    if (files.image) {
      const oldPath = files.image.path;
      const newPath = path.join(process.cwd(), 'public', 'uploads', files.image.name);
      fs.renameSync(oldPath, newPath);
    }

    res.status(200).json({ message: 'Product updated' });
  });
};
