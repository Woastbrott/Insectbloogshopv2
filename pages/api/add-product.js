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

    const productsFilePath = path.join(process.cwd(), 'data', 'products.json');
    const productsFile = fs.readFileSync(productsFilePath, 'utf8');
    const products = JSON.parse(productsFile);

    const newProduct = {
      id: new Date().getTime().toString(),
      title: fields.title,
      price: fields.price,
      description: fields.description,
      quantity: fields.quantity,
      image: files.image ? `/uploads/${files.image.name}` : '',
    };

    products.push(newProduct);

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    if (files.image) {
      const oldPath = files.image.path;
      const newPath = path.join(process.cwd(), 'public', 'uploads', files.image.name);
      fs.renameSync(oldPath, newPath);
    }

    res.status(200).json(newProduct);
  });
};
