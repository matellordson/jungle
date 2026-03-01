import { DrawerEl as Drawer } from "../../../../../../../components/drawer";

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Drawer content={<p>{id}</p>} title={<p>Title</p>}></Drawer>;
}
