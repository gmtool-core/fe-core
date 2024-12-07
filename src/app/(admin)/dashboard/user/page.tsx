import UserTable from "@/components/admin/user.table";
import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ManageUserPage = async (props: IProps) => {
  const page = props?.searchParams.page ?? 1;
  const limit = props?.searchParams.limit ?? 5;
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
    method: "GET",
    queryParams: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-users"] },
    },
  });
  return (
    <div>
      <UserTable users={res.data.data ?? []} meta={res.data.meta}/>
    </div>
  );
};

export default ManageUserPage;
