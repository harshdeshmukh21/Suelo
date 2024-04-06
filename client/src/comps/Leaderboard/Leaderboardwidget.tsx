import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ranks = [
    {
        Name: "Arya",

        ramk: "1",
        Score: "2000",
    },
    {
        Name: "Atharva",

        ramk: "2",
        Score: "1900",
    },
    {
        Name: "Harsh",

        ramk: "3",
        Score: "1700",
    },
    {
        Name: "Sahil",


        ramk: "4",
        Score: "1700",
    },
    {
        Name: "Harsh",


        ramk: "5",
        Score: "1700",
    },
];

export default function TableDemo() {
    return (
        <Table className="text-white mt-8 rounded-lg m-8 h-[350px] w-[90%] bg-[#1F2114]">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Profile</TableHead>
                    < TableHead > Name</TableHead >
                    <TableHead>Rank</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                </TableRow >
            </TableHeader >
            <TableBody>
                {ranks.map((rank, index) => (
                    <TableRow key={index}>
                        <Avatar className="m-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>


                        <TableCell>{rank.Name}</TableCell>
                        <TableCell>{rank.ramk}</TableCell>
                        <TableCell className="text-right">{rank.Score}</TableCell>
                        <TableCell>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Your Rank</TableCell>
                    <TableCell className="text-right">2,500</TableCell>
                </TableRow>
            </TableFooter>
        </Table >
    );
}
