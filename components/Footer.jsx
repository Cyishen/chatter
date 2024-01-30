import Image from "next/image"

const Footer = () => {
  return (
    <footer className="mb-12">
      <div className="wrapper">
        <div className="flex justify-center gap-3 text-[#757575] flex-wrap ">
          <p className="word-hover">About</p>
          <p className="word-hover">Blog</p>
          <p className="word-hover">Apps</p>
          <p className="word-hover">Sign up</p>
          <p className="word-hover">Log in</p>
          <p className="word-hover">Help</p>
        </div>
      </div>

      <div className="wrapper flex flex-col text-center">
          <p>Follow us</p>
          <div className="flex flex-row justify-center gap-3">
            <Image 
              src="/media/twitter.svg"
              alt="logo"
              width={25}
              height={25}
              className=""
            />
            <Image 
              src="/media/youtube.svg"
              alt="logo"
              width={25}
              height={25}
              className=""
            />
            <Image 
              src="/media/fb.svg"
              alt="logo"
              width={25}
              height={25}
              className=""
            />
          </div>
      </div>

      <div className="wrapper flex flex-row gap-4 justify-center">
        <Image 
          src="/media/googleplay.svg"
          alt="logo"
          width={160}
          height={40}
          className="cursor-pointer"
        />
        <Image 
          src="/media/applestore.svg"
          alt="logo"
          width={140}
          height={40}
          className="cursor-pointer"
        />
      </div>

      <div className="wrapper flex justify-center gap-4">
        <p>&copy; 2024 Chatter</p>
      </div>
    </footer>
  )
}

export default Footer