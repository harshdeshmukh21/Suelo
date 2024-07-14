import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { user } = useAuth0();

  return (
    <Table className="text-white mt-8 rounded-lg m-8 h-[350px] w-[90%] bg-[#171717]">
      <TableHeader>
        <TableRow className="flex-row justify-center items-center">
          <TableHead>
            <div className="text-center text-[18px] font-semibold text-white">
              Profile
            </div>
          </TableHead>
          <TableHead>
            <div className="text-center text-[18px] font-semibold text-white">
              Name
            </div>
          </TableHead>
          <TableHead>
            <div className="text-center text-[18px] font-semibold text-white">
              Rank
            </div>
          </TableHead>
          <TableHead>
            <div className="text-center text-[18px] font-semibold text-white">
              Score
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ranks.map((rank, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center justify-center">
                <img src={user?.picture} className="h-10 w-10 rounded-full" />
              </div>
            </TableCell>
            <TableCell>
              <div className="text-center">{rank.Name}</div>
            </TableCell>
            <TableCell>
              <div className="text-center">{rank.ramk}</div>
            </TableCell>
            <TableCell>
              <div className="text-center">{rank.Score}</div>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
