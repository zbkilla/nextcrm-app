import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Building2,
  Calendar,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Smartphone,
  Twitter,
  User,
  UserCircle,
  Youtube,
  Briefcase,
  Hash,
  Edit,
  Trash2,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Cake,
  Tag,
} from "lucide-react";
import moment from "moment";
import { prismadb } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface OppsViewProps {
  data: any;
}

export async function BasicView({ data }: OppsViewProps) {
  const users = await prismadb.users.findMany();
  if (!data) return <div>Contact not found</div>;

  const initials = `${data.first_name?.[0] || ''}${data.last_name?.[0] || ''}`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Header Section with Avatar and Quick Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={data.avatar_url} />
                <AvatarFallback className="text-lg font-semibold bg-primary/10">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">
                    {data.first_name} {data.last_name}
                  </h2>
                  <Badge variant={data.status ? "default" : "secondary"}>
                    {data.status ? "Active" : "Inactive"}
                  </Badge>
                </div>
                {data.position && (
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {data.position}
                  </p>
                )}
                {data.assigned_accounts?.name && (
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {data.assigned_accounts.name}
                  </p>
                )}
                <div className="flex gap-2 pt-2">
                  {data.tags && data.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {data.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Note
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Contact
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid - Left side for main content, Right side for contact info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Social Networks */}
          {(data.social_twitter || data.social_facebook || data.social_linkedin ||
            data.social_instagram || data.social_youtube || data.social_tiktok || data.social_skype) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {data.social_twitter && (
                    <Link
                      href={`https://twitter.com/${data.social_twitter}`}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Link>
                  )}
                  {data.social_facebook && (
                    <Link
                      href={`https://facebook.com/${data.social_facebook}`}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Link>
                  )}
                  {data.social_linkedin && (
                    <Link
                      href={`https://linkedin.com/in/${data.social_linkedin}`}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Link>
                  )}
                  {data.social_instagram && (
                    <Link
                      href={`https://instagram.com/${data.social_instagram}`}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Link>
                  )}
                  {data.social_youtube && (
                    <Link
                      href={`https://youtube.com/${data.social_youtube}`}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      <Youtube className="h-4 w-4" />
                      YouTube
                    </Link>
                  )}
                  {data.social_tiktok && (
                    <Link
                      href={`https://tiktok.com/@${data.social_tiktok}`}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      <Hash className="h-4 w-4" />
                      TikTok
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          {data.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {data.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Notes Section */}
          {data.notes && data.notes.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Notes
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.notes.map((note: string, index: number) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-muted/50 border"
                    >
                      <p className="text-sm">{note}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Added {moment().subtract(index, 'days').fromNow()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Side - Contact Info & Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.email && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Work Email</p>
                  <Link
                    href={`mailto:${data.email}`}
                    className="text-sm font-medium hover:underline flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    {data.email}
                  </Link>
                </div>
              )}

              {data.personal_email && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Personal Email</p>
                  <Link
                    href={`mailto:${data.personal_email}`}
                    className="text-sm font-medium hover:underline flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    {data.personal_email}
                  </Link>
                </div>
              )}

              {data.office_phone && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Office Phone</p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {data.office_phone}
                  </p>
                </div>
              )}

              {data.mobile_phone && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Mobile Phone</p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    {data.mobile_phone}
                  </p>
                </div>
              )}

              {data.website && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Website</p>
                  <Link
                    href={data.website}
                    target="_blank"
                    className="text-sm font-medium hover:underline flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    {data.website}
                  </Link>
                </div>
              )}

              {data.billing_country && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {data.billing_country}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details & Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.birthday && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Birthday</p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Cake className="h-4 w-4" />
                    {moment(data.birthday).format("MMMM DD, YYYY")}
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="text-sm font-medium">
                  {data.type || "Customer"}
                </p>
              </div>

              {data.member_of && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Member of</p>
                  <p className="text-sm font-medium">{data.member_of}</p>
                </div>
              )}

              {data.industry && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Industry</p>
                  <p className="text-sm font-medium">{data.industry}</p>
                </div>
              )}

              <Separator />

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Assigned to</p>
                <p className="text-sm font-medium flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  {users.find((user) => user.id === data.assigned_to)?.name || "Unassigned"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {moment(data.created_on).format("MMM DD, YYYY")}
                </p>
                <p className="text-xs text-muted-foreground">
                  by {users.find((user) => user.id === data.createdBy)?.name}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {moment(data.updatedAt).format("MMM DD, YYYY")}
                </p>
                <p className="text-xs text-muted-foreground">
                  by {users.find((user) => user.id === data.updatedBy)?.name}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}