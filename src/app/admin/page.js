"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Users, Edit3, LogOut, CheckCircle, Clock, AlertTriangle, 
  Trash2, RefreshCw, Search, Database, FileSpreadsheet
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("leads"); // "leads" or "services"
  
  // Leads state
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Services state
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState("");
  const [serviceFormData, setServiceFormData] = useState({
    title: "",
    description: "",
    interestRateNote: "",
    featuresText: "",
    eligibilityText: "",
    documentsText: "",
  });
  const [serviceSaving, setServiceSaving] = useState(false);
  const [serviceMessage, setServiceMessage] = useState({ type: "", text: "" });

  // 1. Auth Guard Redirects
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // 2. Fetch Leads
  const fetchLeads = async () => {
    setLeadsLoading(true);
    setLeadsError("");
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setLeads(data.leads || []);
      } else {
        setLeadsError(data.message || "Failed to load leads list.");
      }
    } catch (err) {
      console.error(err);
      setLeadsError("Network error loading leads database.");
    } finally {
      setLeadsLoading(false);
    }
  };

  // 3. Fetch Services
  const fetchServices = async () => {
    setServicesLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setServices(data.services || []);
        if (data.services?.length > 0) {
          // Default select the first service
          setSelectedServiceSlug(data.services[0].slug);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setServicesLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchLeads();
      fetchServices();
    }
  }, [status]);

  // 4. Update Selected Service Form Data
  useEffect(() => {
    if (selectedServiceSlug && services.length > 0) {
      const service = services.find((s) => s.slug === selectedServiceSlug);
      if (service) {
        setServiceFormData({
          title: service.title || "",
          description: service.description || "",
          interestRateNote: service.interestRateNote || "",
          featuresText: service.features ? service.features.join("\n") : "",
          eligibilityText: service.eligibility ? service.eligibility.join("\n") : "",
          documentsText: service.documents ? service.documents.join("\n") : "",
        });
        setServiceMessage({ type: "", text: "" });
      }
    }
  }, [selectedServiceSlug, services]);

  // 5. Update Lead Status
  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.status === "success") {
        // Update local state state reactively
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead._id === leadId ? { ...lead, status: newStatus } : lead
          )
        );
      } else {
        alert(data.message || "Failed to update lead status");
      }
    } catch (err) {
      console.error(err);
      alert("Error reaching server");
    }
  };

  // 6. Save Service Edits
  const handleSaveService = async (e) => {
    e.preventDefault();
    setServiceSaving(true);
    setServiceMessage({ type: "", text: "" });

    // Parse textareas split by lines
    const features = serviceFormData.featuresText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const eligibility = serviceFormData.eligibilityText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const documents = serviceFormData.documentsText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const payload = {
      slug: selectedServiceSlug,
      title: serviceFormData.title.trim(),
      description: serviceFormData.description.trim(),
      interestRateNote: serviceFormData.interestRateNote.trim(),
      features,
      eligibility,
      documents,
    };

    try {
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.status === "success") {
        setServiceMessage({ type: "success", text: "Service content updated successfully!" });
        // Update local services array to preserve state
        setServices((prev) =>
          prev.map((s) => (s.slug === selectedServiceSlug ? { ...s, ...payload } : s))
        );
      } else {
        setServiceMessage({ type: "error", text: data.message || "Failed to save changes." });
      }
    } catch (err) {
      console.error(err);
      setServiceMessage({ type: "error", text: "Connection error saving edits." });
    } finally {
      setServiceSaving(false);
    }
  };

  // Filter and Search logic for leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile?.includes(searchQuery) ||
      lead.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.loanProduct?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.companyName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "new":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "contacted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "closed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatIndianCurrency = (numStr) => {
    const cleanNum = parseInt(numStr.replace(/,/g, ""));
    if (isNaN(cleanNum)) return numStr;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(cleanNum);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-neutralLight pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Ribbon */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-brand-neutralDark font-heading">
                Cashmax Finserve Control Room
              </h1>
              <p className="text-xs text-gray-400 font-semibold">
                Welcome back, {session?.user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (activeTab === "leads") fetchLeads();
                else fetchServices();
              }}
              className="bg-gray-100 hover:bg-gray-200 text-brand-neutralDark p-2.5 rounded-lg border border-gray-200 transition-colors"
              title="Refresh database records"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2.5 rounded-lg border border-red-200 flex items-center space-x-2 text-sm transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-200 bg-white p-1.5 rounded-xl shadow-sm border max-w-sm">
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === "leads"
                ? "bg-brand-primary text-white shadow-md"
                : "text-gray-400 hover:text-brand-neutralDark"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Submitted Leads</span>
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === "services"
                ? "bg-brand-primary text-white shadow-md"
                : "text-gray-400 hover:text-brand-neutralDark"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Services</span>
          </button>
        </div>

        {/* Dynamic Tab Body */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* TAB 1: LEADS MANAGEMENT */}
          {activeTab === "leads" && (
            <div className="p-6 space-y-6">
              
              {/* Search & Filters */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Name, City, Mobile, Product..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                  />
                </div>

                <div className="flex space-x-4 w-full md:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full md:w-auto px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New Leads</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed / Disbursed</option>
                  </select>
                </div>
              </div>

              {/* Table Wrapper */}
              {leadsLoading ? (
                <div className="text-center py-20">
                  <span className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin inline-block"></span>
                </div>
              ) : leadsError ? (
                <div className="text-center py-12 text-red-500 font-semibold">{leadsError}</div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-wider">
                  No matching lead queries found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-150">
                    <thead className="bg-brand-neutralLight text-brand-neutralDark">
                      <tr>
                        <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Applicant &amp; Company</th>
                        <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Product &amp; Amount</th>
                        <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider">City &amp; Profession</th>
                        <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Mobile No</th>
                        <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Submitted Date</th>
                        <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Status Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-semibold text-brand-neutralDark/80">
                      {filteredLeads.map((lead) => (
                        <tr key={lead._id} className="hover:bg-brand-neutralLight/20 transition-colors">
                          {/* Name & Company */}
                          <td className="px-4 py-4">
                            <p className="font-extrabold text-brand-neutralDark">{lead.name}</p>
                            <p className="text-xs text-gray-400">{lead.companyName || "N/A"}</p>
                          </td>
                          {/* Product & Amount */}
                          <td className="px-4 py-4">
                            <span className="text-xs bg-brand-primary/5 text-brand-primary px-2.5 py-1 rounded-full inline-block font-bold">
                              {lead.loanProduct}
                            </span>
                            <p className="text-sm font-extrabold text-brand-secondary mt-1">
                              {formatIndianCurrency(lead.loanAmount)}
                            </p>
                          </td>
                          {/* City & Profession */}
                          <td className="px-4 py-4">
                            <p className="text-brand-neutralDark">{lead.city}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">{lead.profession}</p>
                          </td>
                          {/* Mobile */}
                          <td className="px-4 py-4 font-mono text-brand-secondary">
                            <a href={`tel:${lead.mobile}`} className="hover:underline">
                              +91 {lead.mobile}
                            </a>
                          </td>
                          {/* Date */}
                          <td className="px-4 py-4 text-xs font-bold text-gray-400">
                            {formatDate(lead.createdAt)}
                          </td>
                          {/* Status Actions */}
                          <td className="px-4 py-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead._id, e.target.value)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-bold focus:outline-none focus:ring-1 focus:ring-brand-primary/20 ${getStatusBadgeClass(
                                lead.status
                              )}`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SERVICES EDITING FORM */}
          {activeTab === "services" && (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Product list sidebar (4 cols) */}
              <div className="lg:col-span-4 bg-brand-neutralLight/50 p-4 rounded-xl border border-gray-100 space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2.5 block mb-2">
                  Select Product to Edit
                </span>
                
                {servicesLoading ? (
                  <div className="text-center py-6">
                    <span className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin inline-block"></span>
                  </div>
                ) : (
                  services.map((service) => (
                    <button
                      key={service.slug}
                      onClick={() => setSelectedServiceSlug(service.slug)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all flex justify-between items-center ${
                        selectedServiceSlug === service.slug
                          ? "bg-brand-primary text-white shadow-md"
                          : "text-brand-neutralDark/80 hover:bg-brand-neutralLight"
                      }`}
                    >
                      <span>{service.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold uppercase border ${
                        selectedServiceSlug === service.slug 
                          ? "border-white/20 bg-white/10 text-white" 
                          : "border-gray-200 bg-gray-100 text-gray-400"
                      }`}>
                        {service.slug}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* Service Edit Form (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <h3 className="text-lg font-bold text-brand-neutralDark border-b border-gray-100 pb-3">
                  Modifying: <span className="text-brand-primary font-black">{services.find(s => s.slug === selectedServiceSlug)?.title}</span>
                </h3>

                {serviceMessage.text && (
                  <div className={`p-4 rounded-lg text-sm font-semibold border-l-4 ${
                    serviceMessage.type === "success" 
                      ? "bg-green-50 border-green-500 text-green-800" 
                      : "bg-red-50 border-red-500 text-red-800"
                  }`}>
                    {serviceMessage.text}
                  </div>
                )}

                <form onSubmit={handleSaveService} className="space-y-4">
                  
                  {/* Title & Interest Rate Note */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                        Product Display Title
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceFormData.title}
                        onChange={(e) => setServiceFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                        disabled={serviceSaving}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                        Interest Rate Note
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceFormData.interestRateNote}
                        placeholder="e.g. Starting from 10.5%*"
                        onChange={(e) => setServiceFormData(prev => ({ ...prev, interestRateNote: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                        disabled={serviceSaving}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1.5">
                      Description / Overview
                    </label>
                    <textarea
                      required
                      value={serviceFormData.description}
                      onChange={(e) => setServiceFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows="4"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                      disabled={serviceSaving}
                    ></textarea>
                  </div>

                  {/* Features, Eligibility, Documents text lists (one per line) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Features List */}
                    <div>
                      <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1">
                        Features List
                      </label>
                      <span className="text-[10px] text-gray-400 font-semibold block mb-1">One item per line</span>
                      <textarea
                        value={serviceFormData.featuresText}
                        onChange={(e) => setServiceFormData(prev => ({ ...prev, featuresText: e.target.value }))}
                        rows="6"
                        placeholder="Bullet point 1&#10;Bullet point 2"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-xs sm:text-sm transition-all"
                        disabled={serviceSaving}
                      ></textarea>
                    </div>

                    {/* Eligibility List */}
                    <div>
                      <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1">
                        Eligibility List
                      </label>
                      <span className="text-[10px] text-gray-400 font-semibold block mb-1">One item per line</span>
                      <textarea
                        value={serviceFormData.eligibilityText}
                        onChange={(e) => setServiceFormData(prev => ({ ...prev, eligibilityText: e.target.value }))}
                        rows="6"
                        placeholder="Criterion 1&#10;Criterion 2"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-xs sm:text-sm transition-all"
                        disabled={serviceSaving}
                      ></textarea>
                    </div>

                    {/* Documents List */}
                    <div>
                      <label className="block text-xs font-bold text-brand-neutralDark/80 uppercase tracking-wider mb-1">
                        Documents Needed
                      </label>
                      <span className="text-[10px] text-gray-400 font-semibold block mb-1">One item per line</span>
                      <textarea
                        value={serviceFormData.documentsText}
                        onChange={(e) => setServiceFormData(prev => ({ ...prev, documentsText: e.target.value }))}
                        rows="6"
                        placeholder="Document 1&#10;Document 2"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-xs sm:text-sm transition-all"
                        disabled={serviceSaving}
                      ></textarea>
                    </div>

                  </div>

                  {/* Save Button */}
                  <button
                    type="submit"
                    disabled={serviceSaving}
                    className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                  >
                    {serviceSaving ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Database className="w-4 h-4 text-brand-accent" />
                        <span>Save Service Edits</span>
                      </>
                    )}
                  </button>

                </form>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
