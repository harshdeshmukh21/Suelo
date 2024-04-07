import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "./Side-bar";
import { Textarea } from "@/components/ui/textarea";

const Updates = () => {
    const { user } = useAuth0();
    const [newUpdate, setNewUpdate] = useState('');
    const [isTextareaVisible, setIsTextareaVisible] = useState(false);

    const handleInputChange = (event) => {
        setNewUpdate(event.target.value);
    };

    const handleSubmit = () => {
        // Implement your submit logic here
        console.log('Submitted:', newUpdate);
        setNewUpdate('');
        setIsTextareaVisible(false);
    };

    const handleClose = () => {
        setNewUpdate('');
        setIsTextareaVisible(false);
    };

    return (
        <div className="flex relative">
            <Sidebar />
            <div className="flex flex-col items-center w-full text-white h-screen justify-center">
                <div className="list overflow-scroll p-2 h-[600px] w-[60%]">
                    <h1 className="text-black text-2xl">Updates</h1>
                    {[...Array(7)].map((_, index) => (
                        <div key={index} className="w-full bg-[#1F2114] h-[100px] mt-8 mb-2 items-center shadow-lg rounded-lg shadow-olive-500/40 p-3 flex flex-col">
                            <div className="flex flex-row items-center space-x-3 w-full">
                                <img src={user?.picture} className="h-10 w-10 rounded-full" />
                                <h1>Atharva</h1>
                            </div>
                            <div className="flex w-full">
                                <h3 className="text-gray-400">today i planted over 2000 plants</h3>
                            </div>
                        </div>
                    ))}
                </div>
                {isTextareaVisible && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white w-[500px] p-4 rounded shadow">
                            <Textarea value={newUpdate} onChange={handleInputChange} className="w-full text-black" />
                            <div className="flex justify-between mt-2">
                                <button onClick={handleClose} className="bg-[#1F2114]  text-white font-bold py-2 px-4 rounded">Close</button>
                                <button onClick={handleSubmit} className="bg-[#1F2114]  text-white   font-bold py-2 px-4 rounded">Submit</button>
                            </div>
                        </div>
                    </div>
                )}
                <button onClick={() => setIsTextareaVisible(true)} className="fixed bottom-4 right-4 bg-[#1F2114] hover:bg-[blue-700] text-white font-bold py-2 px-4 rounded">Add Update</button>
            </div>
        </div>
    );
}

export default Updates;
