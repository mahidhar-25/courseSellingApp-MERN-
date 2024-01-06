const zod = require("zod");

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

const validateAdmin = (username, password) => {
  const response = signInSchema.safeParse({ username, password });
  if (response.success) {
    return true;
  } else {
    return false;
  }
};

const validateUser = (username, password) => {
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
  const response = schema.safeParse({ title, description, price, image });
  if (response.success) {
    return true;
  } else {
    return false;
  }
};

module.exports = { validateAdmin, validateCourse, validateUser };
