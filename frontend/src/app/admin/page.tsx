'use client';

import React, { useEffect, useState } from 'react';
import { LayoutDashboard, DollarSign, ShoppingBag, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/admin/overview')
      .then((res: any) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-sky-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-600 text-sm font-medium">Loading admin stats from backend REST API...</p>
      </div>
    );
  }

  const stats = data?.stats || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <LayoutDashboard className="h-8 w-8 text-sky-600" />
          Admin Dashboard & Metrics
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Real-time order pipeline, revenue stats, pending institutional approvals, and lead management.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</div>
          <div className="text-2xl font-extrabold text-slate-900">₹{(stats.totalRevenue || 0).toLocaleString('en-IN')}</div>
          <div className="text-xs text-emerald-600 font-medium">Confirmed orders revenue</div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending PO Approvals</div>
          <div className="text-2xl font-extrabold text-amber-600">{stats.pendingApprovals || 0}</div>
          <div className="text-xs text-amber-700 font-medium">Institutional PO review required</div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</div>
          <div className="text-2xl font-extrabold text-slate-900">{stats.totalOrders || 0}</div>
          <div className="text-xs text-slate-500">Individual & Institutional</div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Institutional Leads</div>
          <div className="text-2xl font-extrabold text-sky-600">{stats.totalLeads || 0}</div>
          <div className="text-xs text-sky-700 font-medium">{stats.newLeads || 0} new quote inquiries</div>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 font-bold text-slate-900 text-lg">Recent Orders</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Buyer Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data?.recentOrders || []).map((order: any) => (
                <tr key={order.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-mono font-bold text-xs text-slate-900">{order.id}</td>
                  <td className="p-4 font-semibold text-xs text-slate-700">{order.orderType}</td>
                  <td className="p-4">
                    <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2 py-1 rounded-full">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
