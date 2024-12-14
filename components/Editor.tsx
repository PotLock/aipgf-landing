import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps{
    onDescriptionChange?:(description:string)=>void
    value?:string
}

const Editor = ({onDescriptionChange,value}:EditorProps) =>{
    return(
        <ReactQuill theme="snow" className="h-44 text-sm md:text-bases font-aipgf-manrope-semibold-1356" value={value?value:""} onChange={onDescriptionChange} />
    )
}

export default Editor;