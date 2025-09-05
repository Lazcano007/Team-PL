import Spin from "../Components/Spin";

export default function SpinWheel() {
  return (
    <div className="min-h-screen bg-shade-50 cursor-default flex flex-col gap-6 p-8 items-center">
      <h1 className="text-center text-4xl font-extrabold">Snurra hjulet</h1>
      <Spin />
    </div>
  );
}
