import Button from "@/UI/Button";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh_-_64px)] w-full bg-gradient-to-b">
      <h1 className="text-center text-5xl font-[500] leading-[1.2] mb-2">Web Blog</h1>

      <p>
        Add articles and save them to favorites.
      </p>

      <Button
        text="Start"
        style="btn-primary mt-5 bg-[#BCC6CC] transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]"
        link="/post/create"
        type="button"
      />
    </div>
  )
}

export default Home;