import Appbar from "@/components/Appbar";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePublish = async () => {
        const payload = {
            title,
            content,
        };

        try {
            setLoading(true);
            await axios.post(`${BASE_URL}/api/v1/blog`, payload, {
                headers: {
                    Authorization: localStorage.getItem("jwt"),
                },
            });
            navigate("/blogs");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Appbar />
            <div className="mt-20 w-screen">
                <FieldSet className="max-w-4xl mx-auto">
                    <FieldGroup className="gap-5">
                        <Field>
                            <FieldLabel htmlFor="username" className="text-black font-bold">
                                Username
                            </FieldLabel>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password" className="text-black font-bold">
                                Content
                            </FieldLabel>
                            <Textarea placeholder="Enter your content..." onChange={(e) => setContent(e.target.value)} />
                        </Field>
                        <Button variant="default" className="mt-5" onClick={handlePublish}>
                            {loading ? <Spinner /> : "Publish"}
                        </Button>
                    </FieldGroup>
                </FieldSet>
            </div>
        </>
    );
};

export default Publish;
