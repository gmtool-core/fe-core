import Verify from "@/components/auth/verify";

const VerifyPage = ({ params }: { params: { id: number } }) => {
    const {id} = params;
  return <div>
    <Verify id={id}/>
  </div>;
};

export default VerifyPage;
