import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface BlogCardProps {
    id: number;
    title: string;
    description: string;
    date: string;
    authorName: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, description, date, authorName }) => {
    return (
        <Link to={`/blog/${id}`}>
            <section className="flex flex-col max-w-2xl min-w-xl border-b-2 border-gray-200">
                {/* Header Details */}
                <div className="flex gap-2 items-center mb-1.5">
                    <Avatar className="w-7 h-7">
                        <AvatarFallback className="bg-slate-600 text-white text-sm">{authorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-sm text-gray-600">{authorName}</h3>
                    <h2 className="text-gray-600">•</h2>
                    <h3 className="text-sm text-gray-400">{date}</h3>
                </div>

                {/* Title & Description */}
                <div className="flex flex-col mb-2 gap-2">
                    <h1 className="text-2xl font-bold text-black">{title}</h1>
                    <h2 className="text-sm text-gray-500">
                        {description.length > 150 ? description.slice(0, 150) + "..." : description}
                    </h2>
                </div>

                {/* Footer */}
                <p className="text-sm text-gray-400 mt-3 mb-4 flex items-center gap-1">
                    {Math.ceil(description.length / 100)} minutes read
                </p>
            </section>
        </Link>
    );
};

export default BlogCard;
