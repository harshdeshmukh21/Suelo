import { Checkbox } from '@/components/ui/checkbox'
import stars from './star.png'

const Remainder = () => {
    return (
        <div className='w-[90%] mt-8  h-[350px]      rounded-md bg-[#1F2114] p-4 '>
            <div className="flex m-2 rounded-md text-white flex-row w-full"><h1>Daily Remainders to earn </h1>         <img src={stars} className="h-6 ml-2 " /></div>
            <div className='flex m-2 p-2 *:flex-row bg-white text-black rounded-md'>
                <Checkbox className='border-black m-2' /><h2 className='m-1'>Have you planted any trees</h2>
            </div>
            <div className='flex m-2 p-2 flex-row bg-white text-black rounded-md'>
                <Checkbox className='border-black m-2' /><h2 className='m-1'>Have you joined the Activity</h2>
            </div>
            <div className='flex m-2 p-2 flex-row bg-white text-black rounded-md'>
                <Checkbox className='border-black m-2' /><h2 className='m-1'>Have you joined the Activity</h2>
            </div>
            <div className='flex m-2 p-2 flex-row bg-white text-black rounded-md'>
                <Checkbox className='border-black m-2' /><h2 className='m-1'>Have you joined the Activity</h2>
            </div>
            <div className='flex m-2 p-2 flex-row bg-white text-black rounded-md'>
                <Checkbox className='border-black m-2' /><h2 className='m-1'>Have you joined the Activity</h2>
            </div>

        </div>
    )
}

export default Remainder