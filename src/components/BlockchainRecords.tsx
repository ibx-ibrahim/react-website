import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Shield, Lock, CheckCircle, Copy, Download, Eye, AlertCircle, Link2, FileText } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface BlockchainRecord {
  id: string;
  type: string;
  title: string;
  date: string;
  hash: string;
  verified: boolean;
  blockNumber: number;
  previousHash: string;
}

const records: BlockchainRecord[] = [
  {
    id: "1",
    type: "Medical Record",
    title: "Annual Health Checkup",
    date: "Nov 5, 2025",
    hash: "0x8f7a2d3c1b9e4f6a8c5d2e1f7b4a9d3c6e2f8a1b5c9d4e7f2a6b3c8d1e5f9a2",
    verified: true,
    blockNumber: 1523647,
    previousHash: "0x3a1b5c9d4e7f2a6b3c8d1e5f9a2b6c3d7e4f1a8b5c2d9e6f3a7b4c1d8e5f2a9"
  },
  {
    id: "2",
    type: "Prescription",
    title: "Blood Pressure Medication",
    date: "Nov 1, 2025",
    hash: "0x2f9a1b3c5d7e4f8a6b2c9d1e3f5a7b4c8d2e6f1a9b3c5d7e2f4a8b1c6d9e3f5",
    verified: true,
    blockNumber: 1523521,
    previousHash: "0x8f7a2d3c1b9e4f6a8c5d2e1f7b4a9d3c6e2f8a1b5c9d4e7f2a6b3c8d1e5f9a2"
  },
  {
    id: "3",
    type: "Lab Report",
    title: "Complete Blood Count",
    date: "Oct 28, 2025",
    hash: "0x5a9b2c4d6e8f1a3b7c9d2e5f4a8b1c6d9e3f7a2b5c8d1e4f9a3b6c2d7e5f1a8",
    verified: true,
    blockNumber: 1523402,
    previousHash: "0x2f9a1b3c5d7e4f8a6b2c9d1e3f5a7b4c8d2e6f1a9b3c5d7e2f4a8b1c6d9e3f5"
  }
];

const accessLog = [
  { user: "Dr. Sarah Johnson", action: "Viewed", record: "Annual Health Checkup", time: "2 hours ago" },
  { user: "You", action: "Downloaded", record: "Blood Pressure Medication", time: "1 day ago" },
  { user: "City General Hospital", action: "Added", record: "Complete Blood Count", time: "3 days ago" }
];

export default function BlockchainRecords() {
  const [selectedRecord, setSelectedRecord] = useState<BlockchainRecord | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Hash copied to clipboard");
  };

  const verifyRecord = (record: BlockchainRecord) => {
    toast.success(`Record verified on blockchain! Block #${record.blockNumber}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Blockchain Medical Records</h1>
        <p className="text-gray-600 mt-2">Secure, tamper-proof medical records using blockchain technology</p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p>Tamper-Proof</p>
                <p className="text-sm text-gray-500">100% secure</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p>Encrypted</p>
                <p className="text-sm text-gray-500">Military-grade</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p>Verified</p>
                <p className="text-sm text-gray-500">Blockchain</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Link2 className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p>Decentralized</p>
                <p className="text-sm text-gray-500">Distributed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">My Records</TabsTrigger>
          <TabsTrigger value="access">Access Log</TabsTrigger>
          <TabsTrigger value="how">How It Works</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="border-2 border-green-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{record.title}</CardTitle>
                      {record.verified && (
                        <Badge className="bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{record.type} • {record.date}</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedRecord(record)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Block Number</p>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded">#{record.blockNumber}</code>
                      <Badge variant="outline" className="text-xs">Confirmed</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Record Hash</p>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs truncate max-w-[200px]">
                        {record.hash}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(record.hash)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => verifyRecord(record)}>
                    <Shield className="h-4 w-4 mr-2" />
                    Verify on Blockchain
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Share Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Access History</CardTitle>
              <CardDescription>Track who accessed your medical records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accessLog.map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Eye className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p>{log.user}</p>
                        <p className="text-sm text-gray-500">{log.action} • {log.record}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{log.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="how">
          <Card>
            <CardHeader>
              <CardTitle>How Blockchain Records Work</CardTitle>
              <CardDescription>Understanding the technology behind secure medical records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-2">1. Record Creation</h3>
                  <p className="text-sm text-gray-600">
                    Medical records are digitally signed and encrypted
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <Link2 className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="mb-2">2. Blockchain Storage</h3>
                  <p className="text-sm text-gray-600">
                    Records are stored on a distributed blockchain network
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2">3. Verification</h3>
                  <p className="text-sm text-gray-600">
                    Anyone can verify record authenticity using the blockchain
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-4">Key Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p>Immutability: Once recorded, data cannot be altered or deleted</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p>Transparency: Complete audit trail of all access and modifications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p>Security: Military-grade encryption protects your sensitive data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p>Ownership: You maintain complete control over who can access your records</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-900 mb-1">Important Note</h4>
                    <p className="text-sm text-gray-700">
                      While blockchain provides excellent security, always backup your private keys securely. 
                      Lost keys cannot be recovered and will result in permanent loss of access.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Stats */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle>Your Blockchain Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-2xl">{records.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Verified Records</p>
              <p className="text-2xl text-green-600">{records.filter(r => r.verified).length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Blocks</p>
              <p className="text-2xl">1,523,647</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Network Status</p>
              <Badge className="bg-green-600 mt-2">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
