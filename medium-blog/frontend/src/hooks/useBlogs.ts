import { BASE_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
        name: string | null;
    };
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem("jwt"),
                    },
                });
                console.log(res);
                setBlogs(res.data.blogs);
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
        blogs,
    };
};
