import CreatePost from "@/components/CreatePost";

const CreatePostPage = () => {
  return(
    <div className="w-full h-[calc(100vh_-_64px_-_64px)]">
      <CreatePost headingText="Create New Post" buttonText="Create" />
    </div>
  )
}

export default CreatePostPage;