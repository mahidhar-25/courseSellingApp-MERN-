const zod = require("zod");

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

const validateLoginDetails = (username, password) => {
  const response = signInSchema.safeParse({ username, password });
  if (response.success) {
    return true;
  } else {
    return false;
  }
};

const validateCourse = (title, description, price, image) => {
  const schema = zod.object({
    title: zod.string(),
    description: zod.string(),
    price: zod.number(),
    image: zod.string(),
  });

  console.log({
    title,
    description,
    price,
    image,
  });
  const response = schema.safeParse({ title, description, price, image });
  console.log(response);
  if (response.success) {
    return true;
  } else {
    return false;
  }
};

module.exports = { validateLoginDetails, validateCourse };
