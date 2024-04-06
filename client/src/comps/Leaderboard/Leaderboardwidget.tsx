import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import avatar from './avatar.png'

const ranks = [
  {
    Avatar: avatar,
    Name: "Arya",
    Rank: "1",
    Score: "2000",
  },
  {
    Avatar: avatar,
    Name: "Atharva",
    Rank: "2",
    Score: "1900",
  },
  {
    Avatar: avatar,
    Name: "Harsh",
    Rank: "3",
    Score: "1700",
  },
  {
    Avatar: avatar,
    Name: "Sahil",
    Rank: "4",
    Score: "1700",
  },
  {
    Avatar: avatar,
    Name: "Harsh",
    Rank: "5",
    Score: "1700",
  },
];

export default function TableDemo() {
  return (
    <Table className="text-white mt-8 rounded-xl m-8 h-[350px] w-[90%] bg-[#1F2114]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Rank</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ranks.map((rank, index) => (
          <TableRow key={index}>
            <TableCell>
              <img src={rank.Avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
            </TableCell>
            <TableCell>{rank.Name}</TableCell>
            <TableCell>{rank.Rank}</TableCell>
            <TableCell className="text-right">{rank.Score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Your Rank</TableCell>
          <TableCell className="text-right">2,500</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
