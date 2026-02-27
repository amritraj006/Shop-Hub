const products = [
  // ===== T-SHIRTS =====
  {
    name: "Premium Cotton T-Shirt",
    description: "Moisture-wicking premium cotton blend T-shirt for training and daily wear.",
    price: 59,
    size: "M",
    stock: 40,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800"
    },
    category: "T-Shirts"
  },
  {
    name: "Essentials Logo Tee",
    description: "Soft jersey logo tee with modern athletic fit.",
    price: 49,
    size: "L",
    stock: 35,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1563821731637-233bb92b5042?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800"
    },
    category: "T-Shirts"
  },

  // ===== HOODIES =====
  {
    name: "Urban Fleece Hoodie",
    description: "Warm fleece hoodie with adjustable hood and front pocket.",
    price: 89,
    size: "L",
    stock: 20,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1556821840-29ae130b0b8c?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1578587018452-892bace94f12?auto=format&fit=crop&q=80&w=800"
    },
    category: "Hoodies"
  },
  {
    name: "Sportstyle Hoodie",
    description: "Ultra-soft cotton blend hoodie for comfort and performance.",
    price: 95,
    size: "M",
    stock: 18,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1606709773418-245ed82e85bc?auto=format&fit=crop&q=80&w=800"
    },
    category: "Hoodies"
  },

  // ===== JEANS =====
  {
    name: "Classic Slim Fit Jeans",
    description: "Classic slim fit stretch denim for everyday wear.",
    price: 120,
    size: "32",
    stock: 25,
    image: "https://images.unsplash.com/photo-1542272604-780c968509ef?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1604176354204-926873bc2fb9?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=800"
    },
    category: "Jeans"
  },
  {
    name: "Regular Fit Denim",
    description: "Durable denim with timeless design.",
    price: 85,
    size: "34",
    stock: 30,
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1565287040-0259b3af3a21?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800"
    },
    category: "Jeans"
  },

  // ===== SHOES =====
  {
    name: "Active Sneakers",
    description: "Iconic Air cushioning with breathable mesh upper.",
    price: 180,
    size: "10",
    stock: 22,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800"
    },
    category: "Shoes"
  },
  {
    name: "Running Shoes",
    description: "Responsive cushioning built for high performance.",
    price: 200,
    size: "9",
    stock: 15,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1533681473138-03875cced95c?auto=format&fit=crop&q=80&w=800"
    },
    category: "Shoes"
  },

  // ===== JACKETS =====
  {
    name: "Faux Leather Jacket",
    description: "Slim fit biker-style leather jacket.",
    price: 199,
    size: "L",
    stock: 12,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1489987707023-afc82478163a?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1510520286082-95cd2831cd01?auto=format&fit=crop&q=80&w=800"
    },
    category: "Jackets"
  },
  {
    name: "Winter Insulated Jacket",
    description: "Insulated waterproof jacket for extreme weather.",
    price: 250,
    size: "XL",
    stock: 10,
    image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1551731674-cdbbb19a9eec?auto=format&fit=crop&q=80&w=800"
    },
    category: "Jackets"
  },

  // ===== ACCESSORIES =====
  {
    name: "Classic Aviator Sunglasses",
    description: "Timeless metal frame sunglasses with UV protection.",
    price: 150,
    size: "Standard",
    stock: 50,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1572635196237-14b3f281501f?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1508296695146-257a814050b4?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800"
    },
    category: "Accessories"
  },
  {
    name: "Chromograph Watch",
    description: "Premium stainless steel chronograph watch.",
    price: 220,
    size: "Standard",
    stock: 20,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    secondaryImages: {
      image1: "https://images.unsplash.com/photo-1524592094714-0f0654eec275?auto=format&fit=crop&q=80&w=800",
      image2: "https://images.unsplash.com/photo-1548169874-53ce86f7d73f?auto=format&fit=crop&q=80&w=800",
      image3: "https://images.unsplash.com/photo-1508057198894-247b23fe5ef1?auto=format&fit=crop&q=80&w=800"
    },
    category: "Accessories"
  }
];

export default products;