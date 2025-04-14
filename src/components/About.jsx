import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return (<div>
        <div className="flex flex-col items-center mt-8">
            <h1 className=" text-2xl italic font-bold">About Us</h1>
            <User name={"Github profile:"}/>
        </div>
            <UserClass />
            </div>
    )
}

export default About;