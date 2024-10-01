import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = () =>{
    const [description, setDescription] = useState<string|null>(null)
    return(
        <ReactQuill theme="snow" className="h-44 text-sm md:text-bases" value={description?description:""} onChange={setDescription} />
    )
}

export default Editor;