import { BASE_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
        name: string | null;
    };
}

export const useBlogDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("jwt"),
                    },
                });
                console.log(res);
                setBlog(res.data.blog);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    return {
        loading,
        blog,
    };
};
