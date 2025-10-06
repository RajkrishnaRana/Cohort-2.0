import Appbar from "@/components/Appbar";
import BlogCard from "@/components/BlogCard";
import { Spinner } from "@/components/ui/spinner";
import { useBlogs } from "@/hooks/useBlogs";

const Blogs = () => {
    const { loading, blogs } = useBlogs();

    return (
        <>
            <Appbar />
            <div className="flex flex-col gap-8 justify-center items-center py-18">
                {loading ? (
                    <Spinner className="size-10" />
                ) : (
                    <>
                        {blogs.map((blog, index) => (
                            <BlogCard
                                key={index}
                                id={blog.id}
                                title={blog.title}
                                description={blog.content}
                                date={"5th October, 2025"}
                                authorName={blog.author.name || "Anonymus"}
                            />
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default Blogs;
