import "./Walk.scss";
import dog from "../../assets/dog.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type WalkType = {
  trener?: string;
  dog?: string;
  date?: string;
};

export const Walk = ({ trener, dog: pies, date: data }: WalkType) => {
  return (
    <div className="walk">
      <img className="walk__dog-photo" src={dog} alt="" />
      <div className="walk__info">
        <p className="walk__trainer-name">Trener {trener}</p>
        <p className="walk__dog-name">Pies {pies}</p>
        <p className="walk__date">{data}</p>
      </div>
      <div className="walk__calendar">
        <CalendarMonthIcon />
      </div>
    </div>
  );
};
