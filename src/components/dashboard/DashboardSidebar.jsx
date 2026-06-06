import {LayoutSideContent
, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { aside } from "motion/react-client";
import Link from "next/link";

const DashboardSidebar = () => {
      const navItems  = [
    {icon: House, href:"/dashboard/recruiter", label: "Home"},
    {icon: Magnifier,href:"/dashboard/recruiter/jobs", label: "Jobs"},
    {icon: Bell,href:"/dashboard/recruiter/jobs/new-jobs",  label:"Create A Job"},
    {icon: Envelope,href:"/dashboard/recruiter/recruiter-company", label: "company"},
    {icon: Person,href:"/", label: "Profile"},
    {icon: Gear,href:"/", label: "Settings"},
  ];
  const navLink=<>
  <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    href={item.href}
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>
  </>
    return (
        <>
        <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
            {navLink}
        </aside>
        <Drawer>
      <Button className="lg:hidden rounded-none" variant="secondary">
        <LayoutSideContent />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {navLink}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
        </>
        
    );
};

export default DashboardSidebar;