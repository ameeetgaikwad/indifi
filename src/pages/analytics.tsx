import { useSubGraph } from "@/hooks/useTheGraph";
import Layout from "@/views/Layout/Layout";
import Head from "next/head";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Analytics() {
  const { lendAmount, borrowAmount, totalBorrowAmount, totalLendAmount } =
    useSubGraph();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <>
      <Head>
        <title>Analytics</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center mt-32">
          <p className="text-white text-2xl font-bold">
            This analytics is only supported on Polygon zkevm (Blueberry)
          </p>
          <div className="flex flex-row justify-center mt-10 gap-x-4">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Total funds Lent by user</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      {loading ? (
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                        </div>
                      ) : (
                        `$${lendAmount}`
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5"></div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Total funds Lent by user</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      {loading ? (
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                        </div>
                      ) : (
                        `$${borrowAmount}`
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5"></div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>
                  Total funds Lent and Borrowed on the protocol
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      {loading ? (
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div>{`Total Borrowed: $${totalBorrowAmount}`}</div>
                          <div>{`Total Lent: $${totalLendAmount}`}</div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1.5"></div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Analytics;
