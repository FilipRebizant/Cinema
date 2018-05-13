<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin")
 */
class AdminController extends Controller
{
     /**
     * @Route("/")
     */
    public function index(): Response
    {
        return $this->render('admin/index.html.twig');
    }

}
