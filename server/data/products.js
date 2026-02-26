const products = [
  // ===== T-SHIRTS =====
  {
    name: "Nike Dri-FIT Graphic T-Shirt",
    description: "Moisture-wicking premium cotton blend T-shirt for training and daily wear.",
    brand: "Nike",
    category: "T-Shirts",
    price: 59,
    discount: 10,
    countInStock: 40,
    rating: 4.5,
    numReviews: 120,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Grey"],
    isFeatured: true,
    image: "https://source.unsplash.com/600x600/?nike,tshirt",
  },
  {
    name: "Adidas Essentials Logo Tee",
    description: "Soft jersey Adidas logo tee with modern athletic fit.",
    brand: "Adidas",
    category: "T-Shirts",
    price: 49,
    discount: 5,
    countInStock: 35,
    rating: 4.4,
    numReviews: 95,
    sizes: ["M", "L", "XL"],
    colors: ["Blue", "Black"],
    isFeatured: false,
    image: "https://source.unsplash.com/600x600/?adidas,tshirt",
  },

  // ===== HOODIES =====
  {
    name: "Puma Urban Fleece Hoodie",
    description: "Warm fleece hoodie with adjustable hood and front pocket.",
    brand: "Puma",
    category: "Hoodies",
    price: 89,
    discount: 15,
    countInStock: 20,
    rating: 4.6,
    numReviews: 80,
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Olive"],
    isFeatured: true,
    image: "https://source.unsplash.com/600x600/?hoodie,puma",
  },
  {
    name: "Under Armour Sportstyle Hoodie",
    description: "Ultra-soft cotton blend hoodie for comfort and performance.",
    brand: "Under Armour",
    category: "Hoodies",
    price: 95,
    discount: 12,
    countInStock: 18,
    rating: 4.7,
    numReviews: 110,
    sizes: ["S", "M", "L"],
    colors: ["Grey", "Navy"],
    isFeatured: false,
    image: "https://source.unsplash.com/600x600/?hoodie,underarmour",
  },

  // ===== JEANS =====
  {
    name: "Levi's 511 Slim Fit Jeans",
    description: "Classic slim fit stretch denim for everyday wear.",
    brand: "Levi's",
    category: "Jeans",
    price: 120,
    discount: 10,
    countInStock: 25,
    rating: 4.8,
    numReviews: 210,
    sizes: ["30", "32", "34", "36"],
    colors: ["Dark Blue", "Black"],
    isFeatured: true,
    image: "https://source.unsplash.com/600x600/?levis,jeans",
  },
  {
    name: "Wrangler Regular Fit Jeans",
    description: "Durable denim with timeless design.",
    brand: "Wrangler",
    category: "Jeans",
    price: 85,
    discount: 8,
    countInStock: 30,
    rating: 4.3,
    numReviews: 75,
    sizes: ["30", "32", "34"],
    colors: ["Blue"],
    isFeatured: false,
    image: "https://source.unsplash.com/600x600/?wrangler,jeans",
  },

  // ===== SHOES =====
  {
    name: "Nike Air Max Sneakers",
    description: "Iconic Air cushioning with breathable mesh upper.",
    brand: "Nike",
    category: "Shoes",
    price: 180,
    discount: 15,
    countInStock: 22,
    rating: 4.9,
    numReviews: 320,
    sizes: ["7", "8", "9", "10"],
    colors: ["White", "Black"],
    isFeatured: true,
    image: "https://source.unsplash.com/600x600/?nike,sneakers",
  },
  {
    name: "Adidas Ultraboost Running Shoes",
    description: "Responsive cushioning built for high performance.",
    brand: "Adidas",
    category: "Shoes",
    price: 200,
    discount: 20,
    countInStock: 15,
    rating: 4.8,
    numReviews: 280,
    sizes: ["8", "9", "10"],
    colors: ["Black", "Grey"],
    isFeatured: true,
    image: "https://source.unsplash.com/600x600/?adidas,running-shoes",
  },

  // ===== JACKETS =====
  {
    name: "Zara Faux Leather Jacket",
    description: "Slim fit biker-style leather jacket.",
    brand: "Zara",
    category: "Jackets",
    price: 199,
    discount: 18,
    countInStock: 12,
    rating: 4.6,
    numReviews: 90,
    sizes: ["M", "L", "XL"],
    colors: ["Black"],
    isFeatured: true,
    image: "https://source.unsplash.com/600x600/?leather,jacket",
  },
  {
    name: "North Face Winter Jacket",
    description: "Insulated waterproof jacket for extreme weather.",
    brand: "North Face",
    category: "Jackets",
    price: 250,
    discount: 20,
    countInStock: 10,
    rating: 4.9,
    numReviews: 150,
    sizes: ["M", "L"],
    colors: ["Blue", "Black"],
    isFeatured: true,
    image: "https://source.unsplash.com/600x600/?winter,jacket",
  },

  // ===== ACCESSORIES =====
  {
    name: "Ray-Ban Classic Aviator Sunglasses",
    description: "Timeless metal frame sunglasses with UV protection.",
    brand: "Ray-Ban",
    category: "Accessories",
    price: 150,
    discount: 10,
    countInStock: 50,
    rating: 4.7,
    numReviews: 400,
    sizes: ["Standard"],
    colors: ["Gold", "Silver"],
    isFeatured: true,
    image: "https://source.unsplash.com/600x600/?sunglasses,rayban",
  },
  {
    name: "Casio Edifice Chronograph Watch",
    description: "Premium stainless steel chronograph watch.",
    brand: "Casio",
    category: "Accessories",
    price: 220,
    discount: 12,
    countInStock: 20,
    rating: 4.6,
    numReviews: 130,
    sizes: ["Standard"],
    colors: ["Silver", "Black"],
    isFeatured: false,
    image: "https://source.unsplash.com/600x600/?casio,watch",
  },
];

// Duplicate structure variation to reach 50 products
while (products.length < 50) {
  const base = products[products.length % 12];
  products.push({
    ...base,
    name: base.name + " Edition " + (products.length + 1),
    rating: Number((Math.random() * (5 - 4) + 4).toFixed(1)),
    numReviews: Math.floor(Math.random() * 500),
    stock: Math.floor(Math.random() * 50) + 5,
  });
}

// Normalize fields so documents match the Product model
products.forEach((p) => {
  if (!p.size) {
    p.size = Array.isArray(p.sizes) && p.sizes.length ? p.sizes[0] : "Standard";
  }
  if (p.stock === undefined) {
    if (p.countInStock !== undefined) p.stock = p.countInStock;
    else p.stock = 0;
  }
  if (typeof p.rating === "string") p.rating = Number(p.rating);
});

export default products;