const SinglePostPage = () => {
  const post = {
    title: "Sample Post Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et metus et purus volutpat fringilla. Nullam malesuada, libero nec lacinia consequat, lectus odio tincidunt leo, eu congue nunc turpis ac enim. Vestibulum id metus quis elit ullamcorper consequat vel eget lorem. Fusce quis tellus id est sodales feugiat. Proin eget sapien id justo tincidunt malesuada at non nisi.",
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="bg-white p-6 shadow-md rounded-md">
        <p className="text-lg">{post.content}</p>
      </div>
    </div>
  );
};

export default SinglePostPage;
