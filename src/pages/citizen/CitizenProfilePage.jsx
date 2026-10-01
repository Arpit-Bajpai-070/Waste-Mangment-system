import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { MapPin, ShieldCheck, Award, Eye } from "lucide-react";
import Button from "../../components/common/Button";

const escapeHtml = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );

const formatCertificateDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value || "Date not recorded"
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

const getCertificateHtml = (request, user) => {
  const name = escapeHtml(user?.name || "Citizen");
  const title = escapeHtml(request.title);
  const location = escapeHtml(request.location);
  const wasteType = escapeHtml(request.wasteType);
  const requestId = escapeHtml(request.id);
  const city = escapeHtml(user?.city || "Metro Vacuum");
  const filedDate = escapeHtml(formatCertificateDate(request.submittedDate));
  const completionDate = escapeHtml(
    formatCertificateDate(request.completedAt || request.expectedCompletion),
  );

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Certificate - ${requestId}</title>
  <style>
    @page { size: landscape; margin: 10mm; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 24px; background: #eef1e8; color: #17251b; font-family: Georgia, 'Times New Roman', serif; }
    .toolbar { max-width: 1120px; margin: 0 auto 14px; text-align: right; }
    .print-button { border: 0; border-radius: 5px; padding: 11px 16px; background: #14532d; color: white; font: 600 14px Arial, sans-serif; cursor: pointer; }
    .certificate { position: relative; max-width: 1120px; min-height: 700px; margin: auto; padding: 44px 72px 34px; border: 2px solid #a68d51; outline: 1px solid #273b27; outline-offset: -10px; background: #fffefa; text-align: center; box-shadow: 0 14px 40px #17251b18; }
    .ornament { position: absolute; color: #b49a5c; font-size: 34px; line-height: 1; }
    .ornament.top-left { top: 16px; left: 18px; }
    .ornament.top-right { top: 16px; right: 18px; transform: scaleX(-1); }
    .ornament.bottom-left { bottom: 15px; left: 18px; transform: rotate(180deg); }
    .ornament.bottom-right { right: 18px; bottom: 15px; transform: rotate(180deg) scaleX(-1); }
    .brand-row { display: flex; align-items: center; justify-content: center; gap: 12px; }
    .brand-mark { display: grid; width: 48px; height: 48px; place-items: center; border: 2px solid #0c2115; border-radius: 12px; background: #13803c; color: white; font: 28px Arial, sans-serif; }
    .brand-name { color: #111; font: 800 26px Arial, sans-serif; }
    .brand-subtitle { margin-top: 3px; color: #405044; font: 11px Arial, sans-serif; }
    .verification-seal { position: absolute; top: 42px; right: 76px; display: grid; width: 82px; height: 82px; align-content: center; border: 2px solid #a68d51; border-radius: 50%; color: #38583a; font: 700 9px/1.4 Arial, sans-serif; }
    .verification-seal strong { font-size: 22px; }
    .issuer { margin-top: 6px; color: #586356; font: 700 9px/1.4 Arial, sans-serif; letter-spacing: 1px; }
    h1 { margin: 32px 0 10px; color: #164624; font-size: clamp(28px, 4vw, 45px); font-variant: small-caps; font-weight: 600; }
    .intro { margin: 0; color: #263429; font-size: 16px; }
    .recipient { display: inline-block; min-width: 280px; margin: 10px 0 12px; padding: 0 18px 5px; border-bottom: 1px solid #bcb394; color: #111; font-size: clamp(26px, 3.5vw, 38px); font-weight: 700; text-transform: uppercase; }
    .body-copy { max-width: 780px; margin: 0 auto 18px; color: #344238; font: 14px/1.6 Arial, sans-serif; }
    .table-caption { margin: 0 auto 8px; color: #27382a; font: 13px/1.5 Arial, sans-serif; }
    table { width: 100%; border-collapse: collapse; color: #202820; font: 12px/1.4 Arial, sans-serif; text-align: left; }
    td { width: 50%; padding: 9px 12px; border: 1px solid #7d8679; overflow-wrap: anywhere; }
    td strong { margin-right: 4px; }
    .verification-note { margin: 12px 0 0; color: #4b594d; font: 11px/1.5 Arial, sans-serif; }
    .footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: end; gap: 22px; margin-top: 32px; color: #354338; font: 11px/1.4 Arial, sans-serif; }
    .footer-block { max-width: 230px; padding-top: 7px; border-top: 1px solid #737d6e; }
    .footer-block:last-child { justify-self: end; text-align: right; }
    .footer-brand { color: #164624; font: 700 12px Arial, sans-serif; }
    .certificate-id { color: #29372b; font: 700 11px Arial, sans-serif; }
    @media (max-width: 760px) { body { padding: 12px; } .certificate { min-height: 0; padding: 56px 28px 32px; } .verification-seal { position: static; width: 68px; height: 68px; margin: 18px auto 0; } .issuer { margin-top: 8px; } h1 { margin-top: 22px; } .recipient { min-width: 0; max-width: 100%; padding-right: 8px; padding-left: 8px; } .footer { grid-template-columns: 1fr 1fr; margin-top: 24px; } .footer-brand { grid-column: 1 / -1; grid-row: 1; } td { display: block; width: 100%; } }
    @media print { body { padding: 0; background: white; } .toolbar { display: none; } .certificate { max-width: none; min-height: 0; padding: 30px 52px 24px; box-shadow: none; break-inside: avoid; } .verification-seal { top: 30px; right: 64px; } h1 { margin-top: 24px; font-size: 34px; } .body-copy { margin-bottom: 12px; } td { padding: 7px 10px; } .footer { margin-top: 22px; } }
  </style>
</head>
<body>
  <div class="toolbar"><button class="print-button" onclick="window.print()">Print / Save as PDF</button></div>
  <main class="certificate">
    <span class="ornament top-left">❧</span><span class="ornament top-right">❧</span>
    <span class="ornament bottom-left">❧</span><span class="ornament bottom-right">❧</span>
    <header class="brand-row">
      <div class="brand-mark" aria-label="Recycling">♻</div>
      <div><div class="brand-name">VACUUM</div><div class="brand-subtitle">Smart Waste Management System</div></div>
    </header>
    <div class="verification-seal"><strong>V</strong>REQUEST<br>COMPLETED</div>
    <div class="issuer">${city.toUpperCase()}<br>COMMUNITY SERVICE RECORD</div>
    <h1>Certificate of Civic Contribution</h1>
    <p class="intro">This is to certify that</p>
    <div class="recipient">${name}</div>
    <p class="body-copy">has made a valuable contribution to urban cleanliness and sustainable waste management. The service request filed through the VACUUM platform has been successfully completed.</p>
    <p class="table-caption">Request completion details</p>
    <table aria-label="Completed request details">
      <tbody>
        <tr><td><strong>Request ID:</strong> ${requestId}</td><td><strong>Service Type:</strong> ${title}</td></tr>
        <tr><td><strong>Filed Date:</strong> ${filedDate}</td><td><strong>Completion Date:</strong> ${completionDate}</td></tr>
        <tr><td><strong>Location:</strong> ${location}</td><td><strong>Waste Classification:</strong> ${wasteType}</td></tr>
      </tbody>
    </table>
    <p class="verification-note">This certificate records a request marked completed in the VACUUM waste management system.</p>
    <div class="footer">
      <div class="footer-block">Issued by<br><strong>VACUUM Service Team</strong></div>
      <div class="footer-brand">VACUUM · Cleaner neighborhoods together</div>
      <div class="footer-block">Certificate ID<br><strong class="certificate-id">VNT-${requestId}</strong></div>
    </div>
  </main>
</body>
</html>`;
};

const CitizenProfilePage = () => {
  const { user, requests } = useApp();
  const [selectedCertificateId, setSelectedCertificateId] = useState(null);
  const citizenRequests = requests.filter(
    (request) => request.citizenEmail === user?.email,
  );
  const certificates = citizenRequests.filter(
    (request) => request.status === "Completed",
  );
  const selectedCertificate = certificates.find(
    (request) => request.id === selectedCertificateId,
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Citizen Resident Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Your registered resident credentials, neighborhood sector, and civic
          cleanliness record.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white font-extrabold text-2xl shadow-md shadow-emerald-600/20">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {user?.name || "Aarav Mehta"}
            </h3>
            <p className="text-xs text-slate-500">
              {user?.email || "citizen@vacuum.org"}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Resident Guardian
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">
              Registered Phone
            </span>
            <div className="text-slate-800 font-semibold">
              {user?.phone || "+1 (555) 890-1234"}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">
              Municipal City
            </span>
            <div className="text-slate-800 font-semibold">
              {user?.city || "Metro Vacuum"}
            </div>
          </div>

          <div className="sm:col-span-2 rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">
              Assigned Sector / Area
            </span>
            <div className="text-slate-800 font-semibold flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-600" />
              {user?.area || "Greenwood Avenue, Sector 4"}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-[#F0FDF4] p-5 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              Civic Cleanliness Impact
            </h4>
            <p className="text-xs text-emerald-700 mt-0.5">
              You have submitted {citizenRequests.length} requests and helped
              clear ~480kg of segregated waste!
            </p>
          </div>
          <Award className="h-8 w-8 text-emerald-600 shrink-0" />
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Cleanup Certificates
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Certificates are issued when your cleanup requests are completed.
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
            {certificates.length} earned
          </span>
        </div>

        {certificates.length > 0 ? (
          <div className="space-y-3">
            {certificates.map((request) => (
              <article
                key={request.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900">
                    {request.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {request.id} · {request.location} · Completed{" "}
                    {formatCertificateDate(
                      request.completedAt || request.expectedCompletion,
                    )}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Eye}
                  onClick={() => setSelectedCertificateId(request.id)}>
                  View Certificate
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
            <Award className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-2 text-sm font-semibold text-slate-700">
              No certificates yet
            </p>
            <p className="mt-1 text-xs text-slate-500">
              A certificate will appear here after one of your cleanup requests
              is completed.
            </p>
          </div>
        )}
      </section>

      {selectedCertificate && (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">
              Certificate Preview
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedCertificateId(null)}>
              Close Preview
            </Button>
          </div>
          <iframe
            title={`Certificate for ${selectedCertificate.id}`}
            srcDoc={getCertificateHtml(selectedCertificate, user)}
            className="h-190 w-full rounded-xl border border-slate-200 bg-white"
          />
        </section>
      )}
    </div>
  );
};

export default CitizenProfilePage;
