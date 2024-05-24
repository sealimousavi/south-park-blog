import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Eric');
    const [isPending, setIsPending] = useState(false)
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author};
    
        setIsPending(true);
    
        fetch('https://blog-data-one.vercel.app/blogs',{
            method: 'POST',
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(blog)
        } ).then(() => {
            console.log('new blog added');
            setIsPending(false);
            history.push('/');
        })

    }
    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                 type="text"
                 required
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 />
                <label>Blog body:</label>
                <textarea
                 required
                 value={body}
                 onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>
                    Blog author:
                </label>
                <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Stan">Stan</option>
                    <option value="Kyle">Kyle</option>
                    <option value="Eric">Eric</option>

                </select>
                { !isPending && <button>Add Blog</button> }
                { isPending && <button disabled>Adding Blog...</button> }

            </form>
        </div>
    );
}
 
export default Create;