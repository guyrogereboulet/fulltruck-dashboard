import FullTruckLogo from '../logo/FullTruckLogo'

const Nabar = () => {
  return (
    <div className="flex fixed top-0 left-0 w-full z-30 bg-[#fcfcfc] h-[3rem] border-b-[1px]">
      <div className="w-fit flex justify-center items-center">
        <FullTruckLogo />
      </div>
      <div
        className="w-fit pl-1 flex items-end
[1px] text-primary_color pr-12"
      >
        <span
          className="text-[1.2rem] !py-0 mr-[6.4rem]"
          // style={{ textDecoration: 'underline', textDecorationColor: '#f94034', textDecorationThickness: '2px',textUnderlineOffset: '4px'  }}
        >
          Dashboard
        </span>
      </div>
    </div>
  )
}

export default Nabar
