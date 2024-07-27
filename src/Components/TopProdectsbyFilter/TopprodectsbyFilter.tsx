import { useEffect, useState } from "react";
import "./TopProdectsbyFilter.scss";
function TopprodectsbyFilter() {
  const SetInterval = () => {
    // Set a future date and time
    // const futureDate = new Date('2024-07-25T09:01:59').getTime();
    const futureDate = new Date().getTime() + 36000000;

    // Calculate the milliseconds from now until the future date
    const millisecondsUntilFutureDate = futureDate - new Date().getTime();

    const [timeLeft, setTimeLeft] = useState(millisecondsUntilFutureDate);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1000;
          if (newTime <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    const formatTime = (time: any) => {
      return time < 10 ? `0${time}` : `${time}`;
    };

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const displayTime = `${formatTime(hours)}:${formatTime(
      minutes
    )}:${formatTime(seconds)}`;

    return (
      <div className="">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div className="">
            <div className="offer_timer bg-light border d-flex justify-content-center align-items-center fs-2">
              {formatTime(hours)}
            </div>
            Hours
          </div>
          <div className="">
            <div className="offer_timer bg-light border d-flex justify-content-center align-items-center fs-2">
              {formatTime(minutes)}
            </div>
            MINS
          </div>
          <div className="">
            <div className="offer_timer bg-light border d-flex justify-content-center align-items-center fs-2">
              {formatTime(seconds)}
            </div>
            SECS
          </div>
        </div>
        {/* <p>Time Left: {displayTime}</p> */}
      </div>
    );
  };
  return (
    <div className="w-100 mt-5">
      <div className="container-fluid">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 border border-warning card_cover p-3">
          <div className=" card_header">
            <div className="">
              Special
              <br />
              Offer
            </div>
            <div className="offer_price border bg-warning text-dark">
              <div className="">
                <span className="w-100 text-center">Save</span>
                <br />
                <span className="w-100 fw-bold text-center">$125</span>
              </div>
            </div>
          </div>
          <div className=" img_section mt-3 ">
            <img
              src=""
              className="cursor_pointer"
              alt="...."
              width="100%"
              height="100%"
            />
          </div>
          <div className="cursor_pointer w-100 d-flex justify-content-center align-items-start">
            <label className="cursor_pointer w-75 p-3 text-primary text-center">
              Game Console Controller + USB 3.0 Cable
            </label>
          </div>
          <div className="text-center d-flex justify-content-center align-items-center">
            <label className="fs-6 text-decoration-line-through">$99.0</label>
            <label className="text-danger fs-4 mx-2">$79,00</label>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <label className="">
              Available: <label className="fw-bold">6</label>
            </label>
            <label className="">
              Already Sold: <label className="fw-bold">28</label>
            </label>
          </div>
          <div className="progress_bar border bg-light">
            <div
              className="bg-warning progress_bar_inner"
              style={{ width: "calc(28% - 6%)" }}
            ></div>
          </div>
          <div className="">
            <div className="text-center mt-3">Hurry Up! Offer ends in:</div>
            <SetInterval />
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 col-xl-8 col-xxl-8 "></div>
      </div>
    </div>
  );
}

export default TopprodectsbyFilter;
