const CategoryPost = () => {
  const Category = [
    "world",
    "technology",
    "design",
    "culture",
    "business",
    "politics",
    "opinion",
    "science",
    "health",
    "style",
    "travel",
  ];
  return (
    <>
      <option  disabled>Category</option>
      {Category.map((v, i) => (
        <option className="text-capitalize" key={i} value={v}>
          {v}
        </option>
      ))}
    </>
  );
};

export default CategoryPost;
