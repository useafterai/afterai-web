import Link from "next/link";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { isApprovedEmail } from "@/lib/approval";
import ConsoleApp from "@/components/ConsoleApp";
import ConsoleComingSoon from "@/components/ConsoleComingSoon";

export default async function ConsolePage() {
  const approved = await isApprovedEmail();

  if (approved) {
    return <ConsoleApp />;
  }

  return <ConsoleComingSoon />;
}
