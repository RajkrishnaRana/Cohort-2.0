import Appbar from "@/components/Appbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useBlogDetails } from "@/hooks/useBlogDetail";

const Blog = () => {
    const { loading, blog } = useBlogDetails();

    return (
        <>
            <Appbar />
            {loading ? (
                <div className="flex flex-1 justify-center items-center flex-col h-screen w-screen">
                    <Spinner className="size-10" />
                </div>
            ) : (
                <div className="grid grid-cols-12 gap-8 justify-center items-center py-18">
                    <div className="col-span-9 px-20">
                        <h1 className="text-4xl/loose font-extrabold text-black">{blog?.title}</h1>
                        <h3 className="text-md/relaxed text-gray-500">Posted on October 3, 2025</h3>
                        <p className="text-lg/normal text-black font-light pt-2">{blog?.content}</p>
                    </div>
                    <div className="col-span-3 px-10">
                        <h2 className="text-gray-600">Author</h2>
                        <div className="flex gap-3 pt-3 items-center">
                            <Avatar className="w-7 h-7">
                                <AvatarFallback className="bg-slate-600 text-white text-sm">
                                    {blog?.author.name?.charAt(0) || "A"}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <h1 className="text-xl/relaxed text-black font-bold">{blog?.author.name || "Anonymus"}</h1>
                                <p className="text-md text-gray-500">Hello I am a fun writer</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Blog;
